import streamlit as st
import pandas as pd
import os
from datetime import datetime

OFFICIAL_NAME = "ABID KHAN E LEARNING HUB"
PIC_PATH = "frontend/assets/ABID KHAN.png"

st.set_page_config(page_title=OFFICIAL_NAME, layout="wide")

# 1. KNOWLEDGE BASE
IT_SYLLABUS_TEXT = """
ABID KHAN E LEARNING HUB - IT COURSE OUTLINE
-------------------------------------------
1. Python Programming (Basics to Advanced)
2. Web Development (HTML5, CSS3, JavaScript)
3. AI Integration & Prompt Engineering
4. GitHub Portfolio Management
5. UI/UX Design with Figma

FEE: $50 per Month
SCHEDULE: Mon-Fri, 6:00 PM - 8:00 PM PKT
CONTACT: 1111/2222 WHATSAPP
"""

# 2. SIDEBAR
with st.sidebar:
    if os.path.exists(PIC_PATH):
        st.image(PIC_PATH, caption="Abid Khan - Founder", use_container_width=True)
    st.header(OFFICIAL_NAME)
    
    # NEW: DOWNLOAD SYLLABUS BUTTON
    st.download_button(
        label="📥 Download IT Syllabus (PDF/TXT)",
        data=IT_SYLLABUS_TEXT,
        file_name="Abid_Khan_IT_Syllabus.txt",
        mime="text/plain",
    )
    
    st.markdown("---")
    st.subheader("📝 Course Registration")
    with st.form("reg_form", clear_on_submit=True):
        name = st.text_input("Full Name")
        course = st.selectbox("Select Course", ["Online IT", "Web Design", "Revit (BIM)", "Online Quran"])
        phone = st.text_input("WhatsApp Number")
        if st.form_submit_button("Register Now"):
            new_data = pd.DataFrame([[datetime.now().strftime("%Y-%m-%d %H:%M"), name, course, phone]], 
                                    columns=["Date", "Name", "Course", "WhatsApp"])
            new_data.to_csv("registrations.csv", mode='a', header=not os.path.exists("registrations.csv"), index=False)
            st.success(f"✅ Registered! Check your downloads for the syllabus.")

# 3. CHAT INTERFACE
st.title(f"🤖 {OFFICIAL_NAME} Assistant")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Ask me anything about our courses..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        q = prompt.lower()
        if "it" in q or "syllabus" in q:
            response = f"📚 **IT Course Details:**\n{IT_SYLLABUS_TEXT}"
        elif "fee" in q:
            response = "💰 **Fees:** IT Course: $50/mo | Quran: $30/mo."
        else:
            response = "I am here to help with IT and Quran course details. You can also download the syllabus from the sidebar!"
        
        st.markdown(response)
        st.session_state.messages.append({"role": "assistant", "content": response})
