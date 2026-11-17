from django.core.paginator import Paginator
from django.http import Http404
from django.shortcuts import render

from .models import Module, Student


def home(request):
    return render(request, "home.html")


def studentlist(request, page):
    students = Student.objects.all().order_by("lastName", "firstName", "id")
    paginator = Paginator(students, 20)
    page_object = paginator.get_page(page)

    # Use the page number actually shown (get_page fixes out-of-range numbers)
    page_object.adjusted_elided_pages = paginator.get_elided_page_range(
        page_object.number, on_each_side=1, on_ends=1
    )

    return render(request, "studentlist.html", {"page_obj": page_object})


def modulelist(request):
    modules = Module.objects.all().order_by("code")
    return render(request, "modulelist.html", {"modules": modules})


def student_detail(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        raise Http404(f"Student {student_id} not found!")

    return render(request, "student_detail.html", {"student": student})
