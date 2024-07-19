from django.shortcuts import render, redirect
from .models import Item, User
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
items = [
    {"username": "Tayu", "location": "between bondumaget ", "img" : "https://lorem.picsum/100"},
    {"username": "Tayu", "location": "between bondumaget ", "img" : "https://lorem.picsum/100"},
    {"username": "Tayu", "location": "between bondumaget ", "img" : "https://lorem.picsum/100"},
    {"username": "Tayu", "location": "between bondumaget ", "img" : "https://lorem.picsum/100"},
]

# home route
def home(request):
    items = Item.objects.all()
    context = {'items': items}
    return render(request,"home.html", context)

#log in a user that has an account
def registerUser(request):
    if request.method == 'GET':
        form = UserCreationForm()
        context = {"form" : form}
        return render(request,'authform.html', context)
    else:
       form = UserCreationForm(request.POST)
       if form.is_valid():
           user = form.save(commit=False)
           user.username = user.username.lower()
           user.save()
           login(request,user)
           return redirect("profile")
        
    return redirect('home')

def logoutUser(request):
    logout(request)
    return redirect("home")

# Register new user
def loginUser(request):
    if request.user.is_authenticated:
        return redirect('profile')
    page = 'login'
    if request.method == "POST":
        username = request.POST.get("username").lower()
        password = request.POST.get("password").lower()
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request,"Invalid username or password")
            return redirect('login')
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect('profile')
        else:
            messages.error(request,"Invalid username or password")
            return redirect('login')
    else:
        context = {"page": page}
        return render(request, 'authform.html', context)
# Profile of current user
@login_required(login_url='login')
def userProfile(request):
    your_posts = Item.objects.filter(founder=request.user.id)
    context = {"your_posts": your_posts}
    return render(request,"profile.html",context)



# user to post their missing item
def postMissing(request):
    pass

# post an item found
def postFound(request):
    pass