"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, X, Plus, Search } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function DynamicForm({ formDefinition }) {
  if (!formDefinition) {
    return <p className="text-center text-gray-500">Loading form...</p>;
  }

  const form = useForm({
    defaultValues: formDefinition.fields.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? [] : "";
      return acc;
    }, {}),
  });

  const [tagFields, setTagFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = {
        id: formDefinition.id,
        title: formDefinition.title,
        layout: formDefinition.layout,
        fields: Object.entries(data).map(([name, value]) => ({
          name,
          value,
        })),
      };

      const response = await fetch("http://localhost:8000/forms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Failed to save form.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInput = (e, fieldName) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTags = [...(tagFields[fieldName] || []), e.target.value.trim()];
      setTagFields((prev) => ({ ...prev, [fieldName]: newTags }));
      form.setValue(fieldName, newTags);
      form.trigger(fieldName);
      e.target.value = "";
      e.preventDefault();
    }
  };

  const removeTag = (index, fieldName) => {
    const newTags = tagFields[fieldName].filter((_, i) => i !== index);
    setTagFields((prev) => ({ ...prev, [fieldName]: newTags }));
    form.setValue(fieldName, newTags);
    form.trigger(fieldName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            {formDefinition.title}
          </CardTitle>
          {formDefinition.description && <CardDescription>{formDefinition.description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {showSuccess && (
            <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
              <AlertDescription>Form submitted successfully!</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ScrollArea className="h-[60vh] pr-4">
                <div className={`grid ${formDefinition.layout} gap-6`}>
                  {formDefinition.fields.map((field) => (
                    <div key={field.name} className={field.position}>
                      <FormField
                        control={form.control}
                        name={field.name}
                        rules={{ required: field.required ? `${field.label} is required` : false }}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </FormLabel>
                            <FormControl>
                              {field.type === "text" ? (
                                <Input {...formField} className="bg-gray-50" />
                              ) : field.type === "textarea" ? (
                                <Textarea {...formField} className="min-h-32 bg-gray-50" />
                              ) : field.type === "select" ? (
                                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                  <SelectTrigger className="bg-gray-50">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : field.type === "checkbox" ? (
                                <Checkbox checked={formField.value} onCheckedChange={formField.onChange} />
                              ) : field.type === "date" ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {formField.value ? format(formField.value, "PPP") : "Pick a date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <Calendar mode="single" selected={formField.value} onSelect={formField.onChange} />
                                  </PopoverContent>
                                </Popover>
                              ) : field.type === "tags" ? (
                                <div className="space-y-2">
                                  <Input type="text" placeholder="Type and press Enter..." onKeyDown={(e) => handleTagInput(e, field.name)} />
                                  <div className="flex flex-wrap gap-2">
                                    {(tagFields[field.name] || []).map((tag, index) => (
                                      <Badge key={index} variant="secondary">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(index, field.name)}>
                                          <X className="h-3 w-3" />
                                        </button>
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ) : null}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
