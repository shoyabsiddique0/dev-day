import streamlit as st
import pickle
import numpy as np

# Load the pickled model
model = pickle.load(open('ps1-model.pkl', 'rb'))

# Function to predict housing prices
def predict_price(features):
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)
    return prediction

def main():
    st.title('Boston Housing Price Prediction')

    # Input features
    CRIM = st.slider('Per capita crime rate by town:', min_value=0.0, max_value=100.0, value=0.0)
    LSTAT = st.slider('% lower status of the population:', min_value=0.0, max_value=100.0, value=0.0)
    INDUS = st.slider('Proportion of non-retail business acres per town:', min_value=0.0, max_value=100.0, value=0.0)
    RM = st.slider('Average number of rooms per dwelling:', min_value=0.0, max_value=10.0, value=0.0)

    # User feedback
    if st.button('Predict Price'):
        features = [LSTAT, RM, CRIM, INDUS]
        prediction = predict_price(features)
        if prediction[0] < 0:
            st.error('The The predicted price of the house cannot be negative')
        else:
            st.success(f'The predicted price of the house is ${prediction[0]:,.2f}')

if __name__ == '__main__':
    main()
