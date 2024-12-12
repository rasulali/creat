import Image from "next/image";
import { createClient } from "../../../../utils/supabase/server";

type ImageUrls = Record<string, string>;

type Project = {
  id: number;
  created_at: string;
  category: string;
  description?: string;
  page: string;
  name: string;
  images: ImageUrls | null; // Make images nullable, as it can be null or undefined.
};

const Project = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const id = parseInt(params.slug.split('-').pop() || '', 10);

  const supabase = createClient();

  const { data: project, error }: { data: Project | null; error: any } = await supabase
    .from('images')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return <div>Error loading project.</div>;
  }

  return (
    <div>
      <h1>{project?.name}</h1>

      {/* Safe check for images existence */}
      {project?.images && Object.entries(project.images).map(([imageName, imageUrl]) => (
        <div key={imageName}>
          <h3>{imageName}</h3>
          <Image
            src={imageUrl}
            alt={imageName}
            width={500}
            height={300}
          />
        </div>
      ))}

      <p>{project?.description}</p>
    </div>
  );
};

export default Project;
