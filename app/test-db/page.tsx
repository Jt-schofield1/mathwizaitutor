/**
 * Database Test Page - Visual database connection test
 * Visit: http://localhost:3000/test-db
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Database } from 'lucide-react';
import Link from 'next/link';

export default function TestDBPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error('Test failed:', error);
      setTestResults({ error: 'Failed to run tests' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: string) => {
    if (status?.includes('✅')) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status?.includes('❌')) return <XCircle className="w-5 h-5 text-red-600" />;
    return <AlertCircle className="w-5 h-5 text-yellow-600" />;
  };

  const getStatusBadge = (status: string) => {
    if (status?.includes('✅')) return <Badge className="bg-green-600">Success</Badge>;
    if (status?.includes('❌')) return <Badge className="bg-red-600">Error</Badge>;
    return <Badge className="bg-yellow-600">Warning</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wizard-purple-50 to-wizard-parchment-50 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <Database className="w-16 h-16 text-wizard-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-wizard-purple-800 mb-2">
            Database Connection Test
          </h1>
          <p className="text-wizard-purple-600">
            Verify Supabase integration is working properly
          </p>
        </div>

        <div className="mb-6 flex gap-3">
          <Button onClick={runTests} disabled={loading} size="lg" className="flex-1">
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Tests Again
              </>
            )}
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {testResults && (
          <>
            {/* Overall Status */}
            <Card className="mb-6 border-4 border-wizard-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getStatusIcon(testResults.overallStatus)}
                  Overall Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-wizard-purple-800">
                  {testResults.overallStatus}
                </p>
                {testResults.summary && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-wizard-parchment-100 p-3 rounded-lg">
                      <div className="text-sm text-wizard-purple-600">Supabase</div>
                      <div className="text-lg font-bold">
                        {testResults.summary.configured ? '✅ Connected' : '❌ Not Connected'}
                      </div>
                    </div>
                    <div className="bg-wizard-parchment-100 p-3 rounded-lg">
                      <div className="text-sm text-wizard-purple-600">Table</div>
                      <div className="text-lg font-bold">
                        {testResults.summary.tableExists ? '✅ Exists' : '❌ Missing'}
                      </div>
                    </div>
                    <div className="bg-wizard-parchment-100 p-3 rounded-lg">
                      <div className="text-sm text-wizard-purple-600">Miles</div>
                      <div className="text-lg font-bold">
                        {testResults.summary.milesExists ? '✅ Found' : '⚠️ Not Yet'}
                      </div>
                    </div>
                    <div className="bg-wizard-parchment-100 p-3 rounded-lg">
                      <div className="text-sm text-wizard-purple-600">Robert</div>
                      <div className="text-lg font-bold">
                        {testResults.summary.robertExists ? '✅ Found' : '⚠️ Not Yet'}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Individual Tests */}
            <div className="space-y-4">
              {Object.entries(testResults.tests || {}).map(([testName, testData]: [string, any]) => (
                <Card key={testName}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {getStatusIcon(testData.status)}
                        {testName.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      {getStatusBadge(testData.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold mb-2">{testData.status}</p>
                    
                    {testData.supabaseUrl && (
                      <div className="text-sm space-y-1">
                        <div>Supabase URL: {testData.supabaseUrl}</div>
                        <div>Supabase Key: {testData.supabaseKey}</div>
                      </div>
                    )}

                    {testData.data && (
                      <div className="mt-3 bg-wizard-parchment-50 p-4 rounded-lg">
                        <div className="text-sm font-semibold mb-2">Profile Data:</div>
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(testData.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {testData.profiles && (
                      <div className="mt-3 bg-wizard-parchment-50 p-4 rounded-lg">
                        <div className="text-sm font-semibold mb-2">
                          Found {testData.count} profile(s):
                        </div>
                        <pre className="text-xs overflow-auto">
                          {JSON.stringify(testData.profiles, null, 2)}
                        </pre>
                      </div>
                    )}

                    {testData.error && (
                      <div className="mt-3 bg-red-50 border border-red-200 p-4 rounded-lg">
                        <div className="text-sm font-semibold text-red-800 mb-1">Error:</div>
                        <div className="text-xs text-red-600">{testData.error}</div>
                      </div>
                    )}

                    {testData.hint && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="text-sm font-semibold text-yellow-800 mb-1">Hint:</div>
                        <div className="text-xs text-yellow-700">{testData.hint}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Timestamp */}
            <div className="mt-6 text-center text-sm text-wizard-purple-500">
              Last tested: {new Date(testResults.timestamp).toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

