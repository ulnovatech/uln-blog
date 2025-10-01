import { useLocation } from "react-router-dom";

export default function SocialShare({ title }) {
  const location = useLocation();
  const url = encodeURIComponent(window.location.origin + location.pathname);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="social-share">
      <a href={`https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
        Twitter
      </a>
      <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
    </div>
  );
}