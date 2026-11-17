from django.contrib import admin

from .models import Player, Position


class PlayerAdmin(admin.ModelAdmin):
    list_display = ("lastName", "firstName", "age", "show_positions")
    search_fields = ("firstName", "lastName")
    list_filter = ("positions",)
    filter_horizontal = ("positions",)  # easier many-to-many picker

    def show_positions(self, player):
        return ", ".join(p.name for p in player.positions.all())
    show_positions.short_description = "Positions"


class PositionAdmin(admin.ModelAdmin):
    list_display = ("name", "isSpecialist")
    list_filter = ("isSpecialist",)


admin.site.register(Player, PlayerAdmin)
admin.site.register(Position, PositionAdmin)
