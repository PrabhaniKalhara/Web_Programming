from csv import DictReader

from rugby.models import Player, Position

# name: is it a specialist position?
positions = {
    "Tight Head Prop": True,
    "Hooker": True,
    "Loose Head Prop": True,
    "Second Row": True,
    "Open Side Flanker": False,
    "Blind Side Flanker": False,
    "Number 8": False,
    "Scrum Half": False,
    "Fly Half": False,
    "Inside Centre": False,
    "Outside Centre": False,
    "Left Wing": False,
    "Right Wing": False,
    "Full Back": False,
}


def run():
    print("Creating position data")
    for name, specialist in positions.items():
        Position.objects.get_or_create(name=name, defaults={"isSpecialist": specialist})

    print("Loading player data")
    with open("./players.csv", newline="") as f:
        for row in DictReader(f):
            player = Player(
                firstName=row["fname"],
                lastName=row["lname"],
                age=int(row["age"]),
                email=row["email"],
            )
            player.save()

            # Positions are separated by "| " in the csv
            names = [n.strip() for n in row["positions"].split("|") if n.strip()]
            for name in names:
                player.positions.add(Position.objects.get(name=name))

    print("Done")
