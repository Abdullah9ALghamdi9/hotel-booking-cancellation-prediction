
from fastapi import FastAPI
import joblib
from fastapi import HTTPException
import pandas as pd
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


app = FastAPI(title="Hotel Cancellation Prediction API")

model_package = joblib.load("hotel_cancellation_model.joblib")

model = model_package["model"]
threshold = model_package["threshold"]
features = model_package["features"]

@app.get("/")
def home():
    return {
        "message": "Hotel Cancellation API is running",
        "model": "Gradient Boosting",
        "features": len(features),
        "threshold": threshold
    }
 


@app.post("/predict")
def predict(booking: dict):
    missing = [col for col in features if col not in booking]

    if missing:
        raise HTTPException(
            status_code=422,
            detail={"missing_features": missing}
        )

    try:
        data = pd.DataFrame([booking])[features]
        probability = float(model.predict_proba(data)[0][1])

        return {
            "cancellation_probability": round(probability, 4),
            "cancellation_percentage": round(probability * 100, 2),
            "prediction": "Likely to Cancel" if probability >= threshold else "Unlikely to Cancel",
            "threshold": threshold
        }

    except (ValueError, TypeError) as e:
        raise HTTPException(status_code=422, detail=str(e))


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/app")
def hotel_app():
    return FileResponse("static/index.html")

