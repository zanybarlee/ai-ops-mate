
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Upload, X } from 'lucide-react';

interface DocumentUploadFormValues {
  docId?: string;
  metadata?: string;
  replaceExisting: boolean;
  createNewDocStore: boolean;
}

const DocumentUpload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<DocumentUploadFormValues>({
    defaultValues: {
      docId: '',
      metadata: '{}',
      replaceExisting: true,
      createNewDocStore: false,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async (values: DocumentUploadFormValues) => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // This is a mock implementation - in a real app, replace with actual API endpoint
      const formData = new FormData();
      formData.append('files', file);
      
      if (values.docId) {
        formData.append('docId', values.docId);
      }
      
      formData.append('splitter', JSON.stringify({"config":{"chunkSize":20000}}));
      formData.append('metadata', values.metadata || '{}');
      formData.append('replaceExisting', String(values.replaceExisting));
      formData.append('createNewDocStore', String(values.createNewDocStore));

      // Mock API call - replace with your actual implementation
      // const response = await fetch(
      //   "http://localhost:3000/api/v1/document-store/upsert/f9030202-4140-4d97-b5de-c20d82783d28",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Authorization": "Bearer YOUR_API_KEY_HERE"
      //     },
      //     body: formData
      //   }
      // );
      
      // if (!response.ok) {
      //   throw new Error('Upload failed');
      // }
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Document uploaded',
        description: `Successfully uploaded ${file.name} to the knowledge base.`,
      });
      
      // Reset form
      setFile(null);
      form.reset();
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your document.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full mb-6">
          <Upload size={16} className="mr-2" />
          Upload Document
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle>Upload Document</DrawerTitle>
            <DrawerDescription>
              Add documents to the knowledge base for better search results.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="file">Document File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center border-input">
                    {file ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setFile(null)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Input
                          id="file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="file"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Click to select a file
                          </span>
                          <span className="text-xs text-muted-foreground">
                            PDF, DOCX, TXT, MD (max 10MB)
                          </span>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="docId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document ID (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter document ID for updating an existing document"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metadata"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metadata (JSON)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='{}'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="replaceExisting"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Replace Existing</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Replace existing document with the new upserted chunks
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="createNewDocStore"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Create New Doc Store</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Create a new document store for this upload
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <DrawerFooter className="px-0">
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Document"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DocumentUpload;
