from shiny import App, render, ui
import urllib.request

app_ui = ui.page_fluid(
    ui.h2("Total Downloads"),
    ui.output_text_verbatim("txt"),
)


def server(input, output, session):
    @output
    @render.text
    def txt():
        return "Total downloads are 22"
app = App(app_ui, server)
