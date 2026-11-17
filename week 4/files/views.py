from django.http import Http404
from django.shortcuts import render

from .models import Student


def home(request):
    # ORM query: get every student
    students = Student.objects.all()
    return render(request, "home.html", {"students": students})


def student_detail(request, student_id):
    try:
        # ORM query: get one student by id
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        raise Http404(f"Student {student_id} not found!")

    return render(request, "student_detail.html", {"student": student})
