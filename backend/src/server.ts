import app from "./app";
import imageRoutes from "./routes/imageRoutes";
const PORT = 5000;

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});


app.use("/api/images", imageRoutes);