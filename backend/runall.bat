@echo off
python fetch_data.py
python prepare_data.py
python llm_processor.py