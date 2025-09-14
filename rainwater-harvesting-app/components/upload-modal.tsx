"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileImage, X } from "lucide-react"

export function UploadModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Rooftop Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Rooftop Images or Blueprints</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
            <CardContent className="p-6 text-center">
              <FileImage className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload images or blueprints of your rooftop for more accurate analysis
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.dwg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild className="cursor-pointer">
                  <span>Choose Files</span>
                </Button>
              </label>
            </CardContent>
          </Card>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Uploaded Files:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                  <span className="text-sm truncate">{file.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Process Images</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
