require 'csv'

class ResultController < ApplicationController

  protect_from_forgery with: :exception

  #définition des index pour le parsing CSV
  PHONE_INDEX = 0
  MAIL_INDEX = 1
  RANK_INDEX = 2
  NAME_INDEX = 3
  NUMBER_INDEX = 5
  TIME_INDEX = 10
  SPEED_INDEX = 11

  def get
    @name = "test"
    @rank = 43
    @rank_total = 140
    @time = "3\"10'3"
    @speed = 19
    @number = 666
    @race_name = "Ahargo Lasterkaz"
    @race_date = "Barcus 30 avril 2016"

    @rank_image = root_url+'template/images/ic_medal.png'
    @time_image = root_url+'template/images/ic_timer.png'
    @speed_image = root_url+'template/images/ic_speed.png'
    render 'result/template'
  end

  def new
    @message = nil
  end

  def create
    #si on a un fichier
    if params[:file]
      #on récupère le fichier uploadé
      file = params[:file].read
      filename = params[:file].original_filename

      #on enregistre le fichier uploadé dans le répertoire public
      path = File.join Rails.root, 'public', filename
      if path
        if File.extname(path) == CSV_EXTENSION
          File.open(path, 'wb') { |f| f.write file }

          #on parcours une premère fois le CSV pour déterminer le nombre total de concurrents
          CSV.foreach(path, :headers => true, :col_sep => CSV_SEPARATOR) do |row|
            @rank_total = row[RANK_INDEX]
          end

          #on parcours le fichier CSV
          CSV.foreach(path, :headers => true, :col_sep => CSV_SEPARATOR) do |row|
            # ProcessResultJob.perform_now(row.to_hash)
            if row
              #on génère le HTML contenant ces informations
              erb_file = "#{Rails.root}/app/views/result/template.html.erb"
              erb_str = File.read(erb_file)

              phone = row[PHONE_INDEX]
              mail = row[MAIL_INDEX]
              @name = row[NAME_INDEX]
              @rank = row[RANK_INDEX]
              @time = row[TIME_INDEX]
              @speed = row[SPEED_INDEX]
              @number = row[NUMBER_INDEX]
              @race_name = "Ahargo Lasterkaz"
              @race_date = "Barcus 30 avril 2016"

              @rank_image = root_url+'template/images/ic_medal.png'
              @time_image = root_url+'template/images/ic_timer.png'
              @speed_image = root_url+'template/images/ic_speed.png'

              renderer = ERB.new(erb_str)
              if renderer
                rendered_html = renderer.result(binding)
                #on convertit le HTML en img
                kit = IMGKit.new(rendered_html, height: IMAGE_HEIGHT, width: IMAGE_WIDTH)
                kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/template.css"
                folder_name = @race_name+"_"+@race_date
                folder_name = folder_name.gsub!(/\s/, '-')
                image_file_name = folder_name+"_"+@number+".jpg"
                image_path = AWS_ROOT+KAPP10_BUCKET_NAME+"/"+folder_name+"/"+image_file_name

                #on envoi l'img sur S3
                KAPP10_FINISHLINE_BUCKET.object(folder_name+"/"+image_file_name).put(body: kit.to_img(:jpg))

                #on envoi un mail récapitulatif si le mail est fourni et valide
                ResultMailer.mail_result(@name, @time, mail, image_file_name, image_path).deliver_later if mail =~ MAIL_REGEX

              end

            end
          end
          File.delete path
        else
          redirect_to root_url, alert: "Le fichier envoyé n'est pas au format CSV."
        end
      else
        redirect_to root_url, alert: "Aucun fichier envoyé. Veuillez sélectionner un fichier et cliquer sur Envoyer."
      end
    else
      redirect_to root_url, alert: "Aucun fichier envoyé. Veuillez sélectionner un fichier et cliquer sur Envoyer."
    end

  end
end