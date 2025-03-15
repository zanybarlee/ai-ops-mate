
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { UseFormReturn } from 'react-hook-form';
import { FileUploadField } from './FileUploadField';
import { DocumentUploadFormValues } from './types';

interface DocumentUploadFormProps {
  form: UseFormReturn<DocumentUploadFormValues>;
  file: File | null;
  setFile: (file: File | null) => void;
  isUploading: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (values: DocumentUploadFormValues) => void;
}

export const DocumentUploadForm = ({ 
  form, 
  file, 
  setFile, 
  isUploading, 
  handleFileChange, 
  onSubmit 
}: DocumentUploadFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FileUploadField 
          file={file} 
          onFileChange={handleFileChange} 
          onClearFile={() => setFile(null)} 
        />

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
  );
};
