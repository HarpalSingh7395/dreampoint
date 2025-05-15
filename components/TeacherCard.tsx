import Image from 'next/image';

export default function TeacherCard({ name, qualification, experience, imageSrc }) {
  return (
    <div className="card text-center hover:bg-blue-50">
      <div className="mb-4 relative mx-auto rounded-full overflow-hidden w-32 h-32 border-4 border-blue-500">
        <Image 
          src={imageSrc || "/images/teacher-placeholder.jpg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-blue-600 mb-1">{qualification}</p>
      <p className="text-gray-600">{experience}</p>
    </div>
  );
}