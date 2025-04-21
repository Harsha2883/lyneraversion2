
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Download, Edit, Star } from "lucide-react";
import { toast } from "sonner";

type CertificateType = "blockchain" | "accredited" | "standard";

interface Certificate {
  id: number;
  title: string;
  issueDate: string;
  organization: string;
  certificateType: CertificateType;
  imageUrl?: string;
}

export function CertificatesTab() {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Mocked data for demonstration
  const certificates: Certificate[] = [
    { 
      id: 1, 
      title: "Introduction to Sustainability", 
      issueDate: "2023-12-15", 
      organization: "EcoLearn Academy",
      certificateType: "blockchain",
      imageUrl: "/placeholder.svg" 
    },
    { 
      id: 2, 
      title: "Carbon Footprint Reduction", 
      issueDate: "2024-02-20", 
      organization: "Global Green Initiative",
      certificateType: "accredited",
      imageUrl: "/placeholder.svg" 
    },
    { 
      id: 3, 
      title: "Environmental Policy Basics", 
      issueDate: "2024-03-10", 
      organization: "Policy Institute",
      certificateType: "standard",
      imageUrl: "/placeholder.svg" 
    }
  ];

  const handleDownload = (certificate: Certificate) => {
    // In a real app, this would trigger an actual download
    toast.success(`Certificate "${certificate.title}" download started`);
    
    // After successful download, show the review dialog
    setSelectedCertificate(certificate);
    setShowReviewDialog(true);
  };

  const handleRequestEdit = (certificate: Certificate) => {
    toast.success(`Edit request submitted for "${certificate.title}"`);
  };

  const submitReview = () => {
    if (selectedCertificate) {
      toast.success(`Thank you for your ${rating}-star review of "${selectedCertificate.title}"`);
      setShowReviewDialog(false);
      setRating(0);
      setReviewComment("");
      setSelectedCertificate(null);
    }
  };

  const getCertificateTypeBadge = (type: CertificateType) => {
    switch (type) {
      case "blockchain":
        return <Badge variant="default" className="bg-purple-600">Blockchain Verified</Badge>;
      case "accredited":
        return <Badge variant="default" className="bg-green-600">Accredited</Badge>;
      case "standard":
        return <Badge variant="secondary">Standard</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Earned Certificates</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">Blockchain</Button>
          <Button variant="outline" size="sm">Accredited</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden">
            <div className="relative h-40 bg-muted">
              {certificate.imageUrl ? (
                <img 
                  src={certificate.imageUrl} 
                  alt={certificate.title} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Certificate Preview
                </div>
              )}
              <div className="absolute top-2 right-2">
                {getCertificateTypeBadge(certificate.certificateType)}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{certificate.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1">
                <p className="text-sm">Issued: {certificate.issueDate}</p>
                <p className="text-sm text-muted-foreground">
                  Issued by: {certificate.organization}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleRequestEdit(certificate)}
                className="text-xs"
              >
                <Edit className="h-3 w-3 mr-1" /> Request Edit
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleDownload(certificate)}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" /> Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Learning Experience</DialogTitle>
            <DialogDescription>
              Your feedback helps improve our courses for future learners.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`focus:outline-none ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <Star className="h-8 w-8" fill={rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
            
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Share your thoughts about this course..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitReview}>
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
