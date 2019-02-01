class API::V1::SearchesController < API::V1::ApplicationController
  def show
    if params["search-input"]
      event_name = params["search-input"]
      @events = Event.where("name ILIKE ?", "%#{event_name}%" ).limit(8)
    else
      @events = Event.order(id: :desc).limit(10)
    end

    render json: @events
  end
end
