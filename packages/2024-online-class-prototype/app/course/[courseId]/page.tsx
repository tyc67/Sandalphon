
export function generateStaticParams() {
  return [
    {
      courseId: '1',
    },
    {
      courseId: '2'
    }
  ]
}

export default function Page({ params }: { params: { courseId: string}}) {
  return (
    <main>
      Course: #{params.courseId}
    </main>
  )
}
