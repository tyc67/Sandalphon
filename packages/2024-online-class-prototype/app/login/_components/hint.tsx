type Props = {
  success: boolean
  message: string
}

export default function Hint({ success, message }: Props) {
  return (
    <p
      className={`text-sm font-medium leading-[1.8] ${success ? 'text-black' : 'text-[#F04545]'}`}
    >
      {message}
    </p>
  )
}
