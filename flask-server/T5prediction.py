import pandas as pd
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Load pre-trained T5 model and tokenizer
model_name = 't5-small'
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Load your datasets
historic_data = pd.read_csv('path_to_your_historic_data.csv')
party_data = pd.read_csv('path_to_your_party.csv')

# Merge datasets on 'Party' column
combined_data = pd.merge(historic_data, party_data, left_on='Party', right_on='Partyname', how='left')

# Function to generate detailed prompts for prediction
def generate_prediction_prompt(row):
    return (
        f"In the {row['Year']} election, for the constituency {row['Constituency_Name']} in {row['State_Name']}, "
        f"the candidates are: {row['Candidate']} from {row['Party']}. "
        f"Historical performance: {row['Votes']} votes. "
        f"Sentiment analysis: Positive: {row['Positive']}, Negative: {row['Negative']}, Neutral: {row['Neutral']}. "
        f"Additional factors: ApprovalRating: {row['ApprovalRating']}, LeaderPopularity: {row['LeaderPopularity']}, "
        f"SocialMediaInfluence: {row['SocialMediaInfluence']}, Funding: {row['Funding']}, "
        f"CoalitionStrength: {row['CoalitionStrength']}, IncumbencyFactor: {row['IncumbencyFactor']}. "
        f"Predict the winning candidate and their party."
    )

# Function to get prediction from T5 model
def get_prediction(prompts):
    inputs = tokenizer(prompts, return_tensors='pt', padding=True, truncation=True)
    outputs = model.generate(**inputs)
    return [tokenizer.decode(output, skip_special_tokens=True) for output in outputs]

# Process data in batches
batch_size = 100
predictions = []
for start in range(0, combined_data.shape[0], batch_size):
    end = min(start + batch_size, combined_data.shape[0])
    batch = combined_data.iloc[start:end].copy()
    batch['prediction_prompt'] = batch.apply(generate_prediction_prompt, axis=1)
    batch_prompts = batch['prediction_prompt'].tolist()

    # Get predictions
    batch_predictions = get_prediction(batch_prompts)
    batch['llm_prediction'] = batch_predictions
    predictions.append(batch)

# Combine all predictions
combined_data = pd.concat(predictions)

# Post-process LLM predictions to extract winning candidate and party
def extract_winner_info(prediction):
    # Custom logic to parse the prediction output
    candidate, party = "Unknown Candidate", "Unknown Party"
    # Example: You may need to implement a regex or text parsing to extract the candidate and party
    # Assume the prediction format is "Candidate X from Party Y will win."
    words = prediction.split()
    if "from" in words:
        candidate_idx = words.index("from") - 1
        party_idx = words.index("from") + 1
        if candidate_idx >= 0:
            candidate = words[candidate_idx]
        if party_idx < len(words):
            party = words[party_idx]
    return candidate, party

# Apply the extraction function
combined_data[['Winning_Candidate', 'Predicted_Party']] = combined_data['llm_prediction'].apply(lambda x: pd.Series(extract_winner_info(x)))

# Print out the predictions
print("Predictions:")
print(combined_data[['State_Name', 'Constituency_Name', 'Winning_Candidate', 'Predicted_Party']].head())

# Save the predictions to a JSON file
winners_json = combined_data[['State_Name', 'Constituency_Name', 'Winning_Candidate', 'Predicted_Party']].to_json(orient='records', lines=True)
with open('winners_predictions.json', 'w') as f:
    f.write(winners_json)