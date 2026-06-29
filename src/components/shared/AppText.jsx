export default function AppText({ en, ar, as: Tag = "span", className = "" }) {
  return (
    <Tag className={className}>
      <span className="lang-en">{en}</span>
      <span className="lang-ar">{ar}</span>
    </Tag>
  );
}
