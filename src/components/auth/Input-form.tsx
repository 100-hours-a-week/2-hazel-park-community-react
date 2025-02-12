interface inputFormProps {
  title: string
  inputType: string
  value: string
  onChange: (value: string) => void
  error?: string
}

const placeHolders: { [key: string]: string } = {
  Email: 'Enter your email',
  Password: 'Enter your password',
  'Email *': 'Enter your email',
  'Password *': 'Enter your password',
  'Re password *': 'Check your password',
  'Nickname *': 'Enter your nickname',
}

export default function InputForm({
  title,
  inputType,
  value,
  onChange,
  error,
}: inputFormProps) {
  return (
    <>
      <div>
        <div className="mb-2 text-sm">{title}</div>
        <input
          type={inputType}
          placeholder={placeHolders[title] || ''}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-[355px] h-[33px] py-2 pl-[10px] bg-inputBg border-solid border-b border-b-lightBottom text-xs ${
            error ? 'border-red-500' : ''
          }`}
        />
        <div className="mt-1 text-xs text-helper max-w-[355px] break-words h-7">
          {error ? `* ${error}` : ''}
        </div>
      </div>
    </>
  )
}
