from fastapi import APIRouter, UploadFile, File

router = APIRouter(tags=["Patient Files"])

@router.post("/patients/{patient_id}/upload")
async def upload(patient_id: int, file: UploadFile = File(...)):
    path = f"uploads/{file.filename}"

    with open(path, "wb") as f:
        f.write(await file.read())

    return {"message": "File Uploaded"}

@router.get("/patients/{patient_id}/files")
def get_files(patient_id: int):
    return {"message": "Patient Files"}

@router.get("/patients/{patient_id}/files/{file_id}/download")
def download(patient_id: int, file_id: int):
    return {"message": "Download File"}
