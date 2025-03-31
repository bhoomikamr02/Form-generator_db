"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Layers, ArrowRight, FileJson, ChevronDown, Filter, ArrowUpDown, FormInput, LayoutGrid } from 'lucide-react';
import { useRouter } from "next/navigation";

const LandingPageWithShadcnUI = () => {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const navigateToPage = () => {
    router.push("/GetStarted"); // Change to your target route
  };
  
  const navigateToLandingPage = () => {
    router.push("/"); // Change to your target route
  };
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 z-0" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
          <img src="https://lastrasbourgeoise.eu/wp-content/uploads/2018/09/eli-lilly-logo-vector.png" alt="logo" width="110" height="110" onClick={navigateToLandingPage} />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#visualize" className="text-slate-700 font-bold hover:text-red-600 transition-colors">See It In Action</a>
            <a href="#features" className="text-slate-700 font-bold hover:text-red-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-700 font-bold hover:text-red-600 transition-colors">How it works</a>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={navigateToPage}>
                  Generator
    
            </Button>
          </div>
        </nav>

        <div className="relative z-10 px-6 py-16 lg:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Build Dynamic Forms and Tables from <span className="text-red-600">JSON</span> in Seconds
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Transform your JSON data into beautiful, interactive forms and tables without writing a single line of code. Perfect for developers, product managers, and business users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" onClick={navigateToPage}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="rounded-lg shadow-2xl bg-white p-1 border border-slate-200">
              <div className="bg-slate-800 rounded-md p-3 text-white text-sm font-mono overflow-hidden">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-slate-400 text-xs">flow.json</div>
                </div>
                <pre className="text-xs">
{`{
  "form": {
    "title": "Customer Registration",
    "fields": [
      {
        "type": "text",
        "name": "fullName",
        "label": "Full Name",
        "required": true
      },
      {
        "type": "email",
        "name": "email",
        "label": "Email Address"
      },
      {
        "type": "select",
        "name": "plan",
        "label": "Subscription Plan",
        "options": ["Basic", "Pro", "Enterprise"]
      }
    ]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Visualization Section */}
      <section id="visualize" className="py-16 bg-white">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">See The Magic In Action</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Your JSON instantly transforms into polished, interactive UI components
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* JSON to Form Visualization */}
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <FileJson className="h-5 w-5 text-red-600" />
                </div>
                <div className="font-medium ml-2">JSON Schema</div>
                <ArrowRight className="h-5 w-5 mx-3 text-slate-400" />
                <div className="bg-red-50 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <div className="font-medium ml-2">Dynamic Form</div>
              </div>

              {/* Form Visualization using shadcn/ui */}
              <Card className="shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle>Customer Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input id="fullName" placeholder="Enter your full name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email address" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="plan">Subscription Plan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="pro">Pro</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button className="bg-red-600 hover:bg-red-700">Submit</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* JSON to Table Visualization */}
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-red-50 p-2 rounded-full">
                  <FileJson className="h-5 w-5 text-red-600" />
                </div>
                <div className="font-medium ml-2">JSON Data</div>
                <ArrowRight className="h-5 w-5 mx-3 text-slate-400" />
                <div className="bg-red-50 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <path d="M12 3v18" />
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                  </svg>
                </div>
                <div className="font-medium ml-2">Interactive Table</div>
              </div>

              {/* Table Visualization using shadcn/ui */}
              <Card className="shadow-lg">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle>Customer List</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                            ID
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" size="sm" className="p-0 h-8 font-medium">
                            Full Name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">001</TableCell>
                        <TableCell>Sarah Johnson</TableCell>
                        <TableCell>sarah@example.com</TableCell>
                        <TableCell>Pro</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">002</TableCell>
                        <TableCell>Michael Chen</TableCell>
                        <TableCell>michael@example.com</TableCell>
                        <TableCell>Basic</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">003</TableCell>
                        <TableCell>Emma Rodriguez</TableCell>
                        <TableCell>emma@example.com</TableCell>
                        <TableCell>Enterprise</TableCell>
                        <TableCell>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="py-4 px-6 flex items-center justify-between border-t">
                    <div className="text-sm text-slate-500">Showing 3 of 3 entries</div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={true}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
       {/* Features Section */}
       <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to quickly create and deploy dynamic forms and tables
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-red-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileJson className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">JSON Schema Support</h3>
              <p className="text-slate-600">
                Import existing JSON schemas or create new ones with our visual editor. Supports nested objects and arrays.
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-red-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FormInput className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Form Controls</h3>
              <p className="text-slate-600">
                Rich set of form components including text, select, multi-select, date pickers, file uploads, and more.
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="bg-red-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LayoutGrid className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Grid Generation</h3>
              <p className="text-slate-600">
                Transform JSON arrays into sortable, filterable tables with pagination and export capabilities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-100">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Three simple steps to transform your JSON into dynamic forms and tables
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center mb-6 border-2 border-red-600">
                <span className="text-xl font-bold text-red-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Import Your JSON</h3>
              <p className="text-slate-600">
                Upload your JSON file or create a new schema using our visual editor. We'll automatically detect field types.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center mb-6 border-2 border-red-600">
                <span className="text-xl font-bold text-red-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Customize Layout</h3>
              <p className="text-slate-600">
                Arrange form fields and table columns through a simple interface. Set validation rules and styles.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white shadow-lg rounded-full w-16 h-16 flex items-center justify-center mb-6 border-2 border-red-600">
                <span className="text-xl font-bold text-red-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Deploy Anywhere</h3>
              <p className="text-slate-600">
                Get production-ready code, embed via JavaScript, or use our REST API to integrate with any application.
              </p>
            </div>
          </div>
        </div>
      </section>


      

      {/* Code snippet section */}
      <section className="py-16 bg-slate-50">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Zero Coding Required</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Our platform automatically generates all the necessary components, from validation logic to responsive layouts.
          </p>
          <Button asChild variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50">
  <a href="https://github.com/EliLillyCo/Form-Generator-POC.git" target="_blank" rel="noopener noreferrer">
    View Documentation
  </a>
</Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPageWithShadcnUI;
