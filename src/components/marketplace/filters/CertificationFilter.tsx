
import { Checkbox } from "@/components/ui/checkbox";
import { BadgeCheck } from "lucide-react";
import { CERTIFICATIONS } from "../constants";
import { FilterProps } from "../types";

export function CertificationFilter({ filters, setFilters }: FilterProps) {
  const toggleCertification = (cert: string) => {
    setFilters(prev => {
      const isSelected = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: isSelected 
          ? prev.certifications.filter(c => c !== cert)
          : [...prev.certifications, cert]
      };
    });
  };

  return (
    <div className="pt-2 space-y-2">
      {CERTIFICATIONS.map((cert) => (
        <div key={cert} className="flex items-center space-x-2">
          <Checkbox 
            id={`cert-${cert}`}
            checked={filters.certifications.includes(cert)}
            onCheckedChange={() => toggleCertification(cert)}
          />
          <label
            htmlFor={`cert-${cert}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {cert}
          </label>
        </div>
      ))}
    </div>
  );
}
