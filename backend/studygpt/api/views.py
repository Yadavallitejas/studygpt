from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Question
from .serializers import QuestionSerializer
import requests
from django.conf import settings

class QuestionView(APIView):
    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data['user_question']
            subject = serializer.validated_data['subject']
            language = serializer.validated_data['language']

            # Call Gemini API
            api_key = settings.GEMINI_API_KEY
            url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{
                    "parts": [{
                        "text": f"Answer the following question in {language} for a student studying {subject} (based on NCERT syllabus): {question}"
                    }]
                }]
            }
            try:
                response = requests.post(f"{url}?key={api_key}", json=payload, headers=headers)
                response.raise_for_status()
                answer = response.json()['candidates'][0]['content']['parts'][0]['text']
                serializer.validated_data['answer'] = answer
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except requests.exceptions.RequestException as e:
                return Response({"error": f"Gemini API error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)