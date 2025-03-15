
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { DocumentUploadForm } from './DocumentUploadForm';
import { useDocumentUpload } from './useDocumentUpload';

const DocumentUpload = () => {
  const {
    form,
    file,
    setFile,
    isUploading,
    handleFileChange,
    onSubmit
  } = useDocumentUpload();

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
            <DocumentUploadForm
              form={form}
              file={file}
              setFile={setFile}
              isUploading={isUploading}
              handleFileChange={handleFileChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DocumentUpload;
