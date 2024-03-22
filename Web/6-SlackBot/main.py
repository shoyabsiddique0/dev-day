import random
import os
from slack_bolt import App

# Initialize the Slack app with your bot token
app = App(token="xoxb-3026834704370-6858187447617-ZeMm8FayyhpaJvukAL5b2Wd3")

# Define lists of true and false statements
true_statements = [
    "The Eiffel Tower is located in Paris, France.",
    "The Great Wall of China is visible from space.",
    "The Statue of Liberty was a gift from France to the United States.",
    # Add more true statements here
]

false_statements = [
    "The Earth is flat.",
    "The sun revolves around the Earth.",
    "Elephants can fly.",
    # Add more false statements here
]

# Start the game
@app.message("/play_twotruths")
def start_game(message, say):
    user_id = message.get("user")

    # Randomly select two true statements and one false statement
    selected_true = random.sample(true_statements, 2)
    selected_false = random.choice(false_statements)

    # Shuffle the statements
    statements = selected_true + [selected_false]
    random.shuffle(statements)

    # Present the statements to the user
    say(f"Two Truths and a Lie Game!\n\nHere are the statements:\n\n1. {statements[0]}\n2. {statements[1]}\n3. {statements[2]}\n\nGuess which statement is the lie.")

    # Store the selected statements for later validation
    app.client.users_info(user=user_id)["user"]["statements"] = statements
    app.client.users_info(user=user_id)["user"]["lie_index"] = statements.index(selected_false) + 1

# Handle user's guess
@app.message("(1|2|3)")
def handle_guess(message, say):
    user_id = message.get("user")
    user_info = app.client.users_info(user=user_id)["user"]

    if "statements" not in user_info:
        say("You haven't started a game yet. Use the /play_twotruths command to start a new game.")
        return

    # Get the user's guess and the lie index
    guess = int(message.get("text"))
    lie_index = user_info["lie_index"]

    if guess == lie_index:
        say("Correct! You guessed the lie correctly.")
    else:
        say(f"Incorrect. The lie was statement {lie_index}: {user_info['statements'][lie_index - 1]}")

    # Offer to play another round
    say("Would you like to play another round? Type /play_twotruths to start a new game.")

# Start the Slackbot
if __name__ == "__main__":
    app.start(port=3001)