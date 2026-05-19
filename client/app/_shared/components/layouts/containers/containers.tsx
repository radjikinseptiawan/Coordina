export default function ContentPage({ title, description, children }: { title: string, description: string, children: ReactNode }) {
    return (
        <>
            <div className="p-2 mt-10">
                <h1 className="font-bold text-xl">{title}</h1>
                <p className="text-sm text-gray-400">{description}</p>

                <div>{children}</div>
            </div>

        </>
    )
}