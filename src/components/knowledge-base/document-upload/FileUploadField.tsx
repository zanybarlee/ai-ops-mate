
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface FileUploadFieldProps {
  file: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
}

export const FileUploadField = ({ file, onFileChange, onClearFile }: FileUploadFieldProps) => {
  return (
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
              onClick={onClearFile}
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
              onChange={onFileChange}
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
  );
};
