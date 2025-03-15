
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { DocumentUploadFormValues } from './types';

export const useDocumentUpload = () => {
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
      // Create form data for API request
      const formData = new FormData();
      formData.append('files', file);
      
      if (values.docId) {
        formData.append('docId', values.docId);
      }
      
      formData.append('splitter', JSON.stringify({"config":{"chunkSize":20000}}));
      formData.append('metadata', values.metadata || '{}');
      formData.append('replaceExisting', String(values.replaceExisting));
      formData.append('createNewDocStore', String(values.createNewDocStore));

      // Make the actual API call
      const response = await fetch(
        "http://localhost:3001/api/v1/document-store/upsert/f9030202-4140-4d97-b5de-c20d82783d28",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer TLraxS5rm4nFBcYhYfpFM4a63UzicoAu3ccje2txI3M"
          },
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Upload result:', result);
      
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
        description: 'There was an error uploading your document. Please check the console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    file,
    setFile,
    isUploading,
    handleFileChange,
    onSubmit
  };
};
