import { Skeleton } from "@mui/material";

const ApplicationSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: "3.5rem", width: "200px" }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: "1.5rem", width: "30px" }}
        />
      </div>
      <div className="flex gap-4">
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ fontSize: "2.5rem", width: "90%" }}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ fontSize: "2.5rem", width: "10%" }}
        />
      </div>
      <div className="mt-4">
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ fontSize: "4.5rem", width: "100%" }}
        />
      </div>
      <div className="mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <>
            <div className="flex gap-5">
              <Skeleton
                key={index}
                animation="wave"
                variant="rounded"
                sx={{
                  fontSize: "3.5rem",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Skeleton
                key={item}
                animation="wave"
                variant="rounded"
                sx={{
                  fontSize: "3.5rem",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Skeleton
                key={item}
                animation="wave"
                variant="rounded"
                sx={{
                  fontSize: "3.5rem",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Skeleton
                key={item}
                animation="wave"
                variant="rounded"
                sx={{
                  fontSize: "3.5rem",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Skeleton
                key={item}
                animation="wave"
                variant="rounded"
                sx={{
                  fontSize: "3.5rem",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <Skeleton
                key={item}
                animation="wave"
                variant="rounded"
                sx={{
                  fontSize: "3.5rem",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ApplicationSkeleton;
