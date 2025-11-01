/**
 * Vision API - OCR + LLM approach
 * 1. Extract text from image using OCR.space API (free, no signup)
 * 2. Send extracted text to Groq LLM for interpretation
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image, gradeLevel } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }

    // Validate image format
    if (!image.startsWith('data:image/')) {
      console.error('OCR API: Invalid image format - missing data:image/ prefix');
      return NextResponse.json(
        { error: 'Invalid image format' },
        { status: 400 }
      );
    }

    // Log image details for debugging
    const imageType = image.split(';')[0].split(':')[1];
    const imageSizeKB = Math.round((image.length * 3) / 4 / 1024);
    console.log(`OCR API: Image type: ${imageType}, size: ~${imageSizeKB}KB`);

    // STEP 1: Extract text using OCR.space API (free tier with demo key)
    try {
      console.log('OCR API: Extracting text from image using OCR.space...');
      
      // Ensure image has proper data URL format
      let imageData = image;
      if (!image.startsWith('data:image/')) {
        // If base64 only, add the data URL prefix
        imageData = `data:image/png;base64,${image}`;
      }
      
      console.log('OCR API: Image format check:', imageData.substring(0, 50));
      console.log('OCR API: Image size:', imageSizeKB, 'KB');
      
      // Try multiple OCR engines if first one fails
      const engines = ['1', '2']; // Engine 1 = default, Engine 2 = better for complex text
      let extractedText = '';
      
      for (const engineNum of engines) {
        console.log(`OCR API: Trying OCR Engine ${engineNum}...`);
        
        // Prepare form data for OCR.space API
        const formData = new FormData();
        formData.append('base64Image', imageData);
        formData.append('language', 'eng');
        formData.append('isOverlayRequired', 'false');
        formData.append('detectOrientation', 'true');
        formData.append('scale', 'true');
        formData.append('OCREngine', engineNum);
        // Use real API key from environment, fallback to demo key
        formData.append('apikey', process.env.OCR_SPACE_API_KEY || 'helloworld');
      
        const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          body: formData,
        });

        console.log(`OCR API: Engine ${engineNum} response status:`, ocrResponse.status);

        if (ocrResponse.ok) {
          const ocrData = await ocrResponse.json();
          console.log(`OCR API: Engine ${engineNum} response:`, JSON.stringify(ocrData, null, 2));
          
          if (!ocrData.IsErroredOnProcessing) {
            const text = ocrData.ParsedResults?.[0]?.ParsedText || '';
            if (text && text.trim().length > 0) {
              extractedText = text;
              console.log(`OCR API: Engine ${engineNum} SUCCESS! Extracted:`, text);
              break; // Found text, stop trying other engines
            } else {
              console.log(`OCR API: Engine ${engineNum} returned empty text`);
            }
          }
        }
      }

      console.log('OCR API: Final extracted text length:', extractedText.length);
      console.log('OCR API: Final extracted text:', extractedText);

      if (!extractedText || extractedText.trim().length === 0) {
        console.error('OCR API: No text extracted from any engine - image might be empty, too small, or unreadable');
        
        // Return a helpful message instead of throwing an error
        return NextResponse.json({
          success: true,
          extractedText: `I see your image, but I couldn't find any text in it. 🔍

This might happen if:
• The image is blank or very small
• The text is too light or faint
• The handwriting is unclear
• It's a photo of a screen (try screenshot instead)

**Please try:**
1. Take a clearer, closer photo
2. Use good lighting
3. Make sure the problem is clearly visible
4. Or type the problem directly

I'm ready to help! 📝`,
          usingOCR: true,
          usingLLM: false,
        });
      }

      // STEP 2: Send extracted text to Groq LLM to format it properly
      if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'demo_key') {
        console.log('LLM API: Formatting extracted text with Groq...');
        
        const llmResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant', // Fast text-only model
            messages: [
              {
                role: 'system',
                content: `You are a math expert helping reconstruct math problems from OCR-extracted text. OCR often breaks equations across multiple lines and fragments fractions.`
              },
              {
                role: 'user',
                content: `The following text was extracted from a math problem photo using OCR. It's fragmented and poorly formatted.

**Your task:**
1. **Reconstruct the complete equation** - OCR often splits equations across lines
2. **Fix fractions** - Look for patterns like "numerator / denominator" or "ax 2" (should be "ax - 2")
3. **Identify the question** - "What is the value of...?", "Solve for...", etc.
4. **Include multiple choice** - If you see A), B), C), D) with numbers, include them
5. **Fix OCR errors** - Common: O→0, l→1, S→5, "^2" for exponents, "ax 2" → "ax - 2"
6. **Use proper notation** - Use ^ for exponents (x^2), / for fractions, proper spacing

**OCR Text:**
"""
${extractedText}
"""

**Format your response as:**
- Write out the COMPLETE equation on one line
- State the question clearly
- If multiple choice, list all options
- Be thorough - reconstruct everything from the fragments

Example: If you see "24x" on one line, "ax 2" on another, and "= -8x - 3" elsewhere, reconstruct it as:
"(24x^2 + 25x - 47)/(ax - 2) = -8x - 3 - 53/(ax - 2)"

Now reconstruct this problem completely and clearly.`
              }
            ],
            temperature: 0.3,
            max_tokens: 800,
          }),
        });

        if (llmResponse.ok) {
          const llmData = await llmResponse.json();
          const formattedText = llmData.choices?.[0]?.message?.content;
          
          if (formattedText) {
            console.log('LLM API: Successfully formatted text');
            return NextResponse.json({
              success: true,
              extractedText: formattedText,
              usingOCR: true,
              usingLLM: true,
            });
          }
        }
      }

      // Fallback: return raw OCR text if LLM fails or no API key
      return NextResponse.json({
        success: true,
        extractedText: `**Extracted Text:**\n\n${extractedText}\n\n*(OCR extracted - please verify)*`,
        usingOCR: true,
        usingLLM: false,
      });
      
    } catch (error: any) {
      console.error('OCR/LLM error:', error);
      console.error('Error message:', error.message);
      
      // Return helpful fallback message
      return NextResponse.json({
        success: true,
        extractedText: `I can see your homework! 📸 

Unfortunately, I had trouble reading the text clearly. This can happen with:
• Handwritten math problems
• Low light or blurry photos
• Complex equations

**Please try:**
1. Taking a clearer photo with better lighting
2. Making sure the problem is in focus
3. Holding the camera steady
4. Or typing the problem directly

I'm here to help once you share the problem! 🧙‍♂️`,
        usingOCR: false,
        usingLLM: false,
      });
    }

  } catch (error: any) {
    console.error('Vision API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze image' },
      { status: 500 }
    );
  }
}

