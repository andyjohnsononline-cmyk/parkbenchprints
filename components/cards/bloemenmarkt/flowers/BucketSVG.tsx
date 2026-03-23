interface BucketSVGProps {
  className?: string;
}

export default function BucketSVG({ className = "" }: BucketSVGProps) {
  return (
    <svg viewBox="0 0 1026.05 914.64" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Bucket illustration">
      <path fill="#dadbdc" d="M217.13,199.27c23.11,173.54,46.21,347.08,69.32,520.63,151.87,9.14,304.5,5.47,455.75-10.96,22.24-173.03,44.48-346.07,66.72-519.1-193.69,35.5-393.47,37.53-587.84,5.97"/>
    </svg>
  );
}
