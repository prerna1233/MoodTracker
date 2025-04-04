

import React, { useState, useEffect } from "react";
import "./Mainpage.css";

const Mainpage = () => {
    const [mood, setMood] = useState("");
    const [allMoods, setAllMoods] = useState([]);
    const [suggestions, setSuggestions] = useState(""); // State to store suggestions
    const [loading, setLoading] = useState(false); // To track loading state

    // Predefined suggestions for moods
    const moodSuggestions = {
        happy: "It's wonderful that you're feeling happy! Cherish this moment and let your happiness inspire others around you. Maybe you can express your gratitude for the little things in life, or share your joy by calling a loved one or helping someone in need. Keep spreading positivity—it’s contagious!",
        sad: "It's perfectly normal to feel sad at times. Be kind to yourself and give yourself permission to process your emotions. You might find comfort in talking to a trusted friend or journaling your thoughts. A comforting activity like watching your favorite movie, cooking, or going for a quiet walk in nature can also uplift your spirits.",
        angry: "Feeling angry is a natural reaction, but it’s important to release it in a healthy way. Take a moment to step back, breathe deeply, and count to ten. You could try writing down your feelings to better understand them or engaging in physical activity like a brisk walk or yoga to release built-up energy. Listening to calming music or practicing mindfulness can also bring a sense of balance.",
        anxious: "Anxiety can feel overwhelming, but you’re not alone in this. Take a few moments to focus on your breathing—inhaling slowly for four counts, holding for four, and exhaling for four. Writing down your worries or talking them out with someone can help. Remember, one step at a time—focus on what you can control, and let the rest go. You’ve got this!",
        excited: "Your excitement is a gift—embrace it! Channel this energy into something meaningful, like starting a creative project, planning a future goal, or celebrating with the people you love. Don’t forget to capture this moment of enthusiasm to look back on later—it’s a source of inspiration for you and others!",
        tired: "Your body and mind are telling you to recharge—listen to them. Take a short power nap or spend a few minutes doing light stretching or yoga to relax your muscles. Stay hydrated and have a healthy snack to boost your energy levels. When you’re ready, return to your tasks with a renewed focus.",
        stressed: "Stress can feel heavy, but breaking things into manageable chunks can make a big difference. Create a to-do list and prioritize tasks one at a time. Don’t forget to take short breaks and reward yourself for every step completed. Spending time in nature, practicing mindfulness, or listening to soothing music can help release tension.",
        relaxed: "Savor this moment of peace—it's well-deserved. Consider writing down what helped you achieve this state so you can recreate it in the future. You might enjoy activities like reading, meditating, or simply being present in the moment. Share your calm energy with others; it’s a gift worth giving!",
        bored: "Boredom can be an opportunity to explore new things. Try diving into a creative project, learning a new skill, or watching an educational video about something you’re curious about. If you need to recharge, allow yourself to rest. Sometimes, simply rearranging your environment or going for a walk can spark inspiration."
    };
    

    // Load saved moods from local storage
    useEffect(() => {
        const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
        setAllMoods(savedMoods);
    }, []);

    // Save the mood in local storage
    const saveMood = () => {
        if (mood.trim() === "") return; // Prevent saving empty moods

        const newMood = { id: Date.now(), mood };
        const updatedMoods = [...allMoods, newMood];
        setAllMoods(updatedMoods);
        localStorage.setItem("moods", JSON.stringify(updatedMoods));
        setMood("");

        // Generate suggestions after saving the mood
        fetchAISuggestions(newMood.mood);
    };

    const fetchAISuggestions = (userMood) => {
        setLoading(true);
        const moodLower = userMood.toLowerCase();
        const suggestion = moodSuggestions[moodLower];

        if (suggestion) {
            setSuggestions(suggestion);
        } else {
            setSuggestions(
                "Sorry, I don't have specific suggestions for this mood, but remember to take care of yourself and do what makes you happy!"
            );
        }

        setLoading(false);
    };

    // Edit mood
    const editMood = (id) => {
        const updatedMoods = allMoods.map((m) =>
            m.id === id
                ? { ...m, mood: prompt("Edit your mood:", m.mood) || m.mood }
                : m
        );
        setAllMoods(updatedMoods);
        localStorage.setItem("moods", JSON.stringify(updatedMoods));
    };

    // Delete mood
    const deleteMood = (id) => {
        const updatedMoods = allMoods.filter((m) => m.id !== id);
        setAllMoods(updatedMoods);
        localStorage.setItem("moods", JSON.stringify(updatedMoods));
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to the Mood Tracker!</h2>
            <div className="mood-input">
                <textarea
                    placeholder="Enter your current feeling..."
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                ></textarea>
                <button onClick={saveMood} className="save-btn">
                    Save Mood
                </button>
            </div>

            {/* AI Suggestions */}
            {loading ? (
                <p>Loading suggestions...</p>
            ) : suggestions ? (
                <div className="ai-suggestions">
                    <h3>Suggestions to improve your mood:</h3>
                    <p>{suggestions}</p>
                </div>
            ) : null}

            <div className="moods-list">
                <h3>Saved Moods:</h3>
                <ul>
                    {allMoods.map((moodData) => (
                        <li key={moodData.id} className="mood-item">
                            <span>{moodData.mood}</span>
                            <div className="mood-actions">
                                <button
                                    onClick={() => editMood(moodData.id)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteMood(moodData.id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Mainpage;









