import Image from "next/image"

interface EmptyComponentProps {
  title?: string
  description?: string
  action?: React.ReactElement
}

export default function Empty({
  title = "The item you are looking for is not present or missing!!",
  description = "Maybe refresh the page to give a check again!!",
  action,
}: EmptyComponentProps) {
  return (
    <div className="flex min-h-[calc(100vh-122px)] flex-col items-center justify-center">
      <div>
        <Image
          src={"/icons/empty.svg"}
          width={400}
          height={200}
          className="object-contain"
          alt="Empty container"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-center text-2xl font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action && <div className="mt-8">{action}</div>}
    </div>
  )
}
