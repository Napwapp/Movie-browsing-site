export default function Label({text}: {text: string}) {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700 mb-1">{text}</label>
        </>
    )
};
