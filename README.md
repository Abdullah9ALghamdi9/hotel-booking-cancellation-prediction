# Hotel Booking Cancellation Prediction

## Overview

A Machine Learning web application designed to help hotel staff predict booking cancellations and identify high-risk reservations.

## Features

- Interactive dashboard
- Hotel booking cancellation predictions
- Cancellation probability and risk levels<img width="1440" height="900" alt="‏لقطة الشاشة ١٤٤٨-٠٥-٠٦ في ١٠ ٤٤ ٢٦ م" src="https://github.com/user-attachments/assets/4c688c86-f32c-4910-a653-96249dd059db" />

- Guest booking information
- FastAPI backend connected to a trained ML model

## Technologies

- Python
- Scikit-learn
- Pandas
- FastAPI
- HTML, CSS, JavaScript
- Joblib

## Machine Learning Model

- **Algorithm:** HistGradientBoostingClassifier
- **Input Features:** 27
- **Classification Threshold:** 0.36
- **Test Accuracy:** 86.09%
- **Test F1-score:** 81.59% (at threshold 0.50)

The model was optimized using RandomizedSearchCV and cross-validation.

## Dataset

Hotel Booking Demand Dataset

Source: https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand

## How to Run

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn main:app --reload
```

Open http://127.0.0.1:8000/app

## Note

This is a machine learning portfolio project. The dashboard displays fictional guest profiles, while cancellation probabilities are calculated using the trained model.
