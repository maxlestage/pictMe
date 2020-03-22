class EventsController < ApplicationController
  layout "picto", only: [:list_picto, :home_picto]
  require 'csv'
  before_action :set_event, only: [:show, :edit, :update, :destroy, :home_picto]

  # disable the filter for for all actions in this controller
  before_filter :disable_filter_pict_home!
  # enable the filter for action list_picto in this controller
  before_filter :enable_filter_pict_home!, :only => [:list_picto]



  def index
    @events = Event.order('created_at desc').limit(20)
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to @event, notice: "Evènement créé !"
    else
      render :new
    end
  end

  def show
    @client_1 = @event.client_1.blank? ? nil : Client.find(@event.client_1)
    @client_2 = @event.client_2.blank? ? nil : Client.find(@event.client_2)
    @client_3 = @event.client_3.blank? ? nil : Client.find(@event.client_3)
  end

  def edit
  end

  def update
    if @event.update(event_params)
      redirect_to @event, notice: "Evènement mis à jour."
    else
      render :edit
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_path, notice: "Evènement effacé." }
    end
  end

  def upload
  end

  def import
    begin
      Event.import(params['file'])
      redirect_to root_path, notice: 'Evènements importés'
    rescue StandardError => e
      p e
      redirect_to root_path, notice: "Erreur: impossible d'importer les évènements"
    end
  end

  #=================
  #Events for Picto
  #=================
  def list_picto
    @events = Event.order('created_at desc').limit(5)
  end

  def home_picto
  end

  private
  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(
        :id,
        :name,
        :place,
        :website,
        :facebook,
        :twitter,
        :instagram,
        :contact,
        :email,
        :phone,
        :client_1,
        :client_2,
        :client_3,
        :department,
        :challenge_id,
        :global_challenge,
        :country,
        :adress,
        :pictme
    )
  end
end
