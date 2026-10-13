import TaskListCard from "./task-list-card"

export default function TaskListCards() {
  return (
    <div className="grid-grid-cols-1 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
        <TaskListCard key={i} />
      ))}
    </div>
  )
}
