FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PORT=7860

# Hugging Face Spaces requires running as a non-root user (UID 1000)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

WORKDIR $HOME/app

COPY --chown=user:user . $HOME/app
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
