

export function TopicList({ topics }: { topics: string[] }) {
  return (
    <div className="topics">
      {topics.map((topic) => (
        <span key={topic}>{topic}</span>
      ))}
    </div>
  );
}
