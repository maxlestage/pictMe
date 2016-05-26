Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  # config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  # config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  #configuration des loggers
  config.log_level = :debug
  Resque.logger.level = MonoLogger::DEBUG

  WKHTMLTOIMAGE_PATH = '/Users/IBI/.rvm/gems/ruby-2.3.0/bin/wkhtmltoimage'

  ENV['REDIS_URL'] ||= 'redis://h:pc2lj6n5vu31r0fiqf36omi41q8@ec2-54-217-205-248.eu-west-1.compute.amazonaws.com:8139'
  ENV['MIN_PUMA_WORKERS_COUNT'] ||= '1'
  ENV['MAX_PUMA_WORKERS_COUNT'] ||= '8'

  #config S3
  ENV['AWS_REGION'] ||= 'eu-west-1'
  ENV['S3_BUCKET'] ||= 'kapp10finishline'
  ENV['AWS_ACCESS_KEY_ID'] ||= 'AKIAIT5MGBQ56BK3QPSQ'
  ENV['AWS_SECRET_ACCESS_KEY'] ||= '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'

  ENV['ALLMYSMS_LOGIN'] ||= 'kappsports1'
  ENV['ALLMYSMS_API_KEY'] ||= '26796fefc15acae'

  ENV['BITLY_API_TOKEN'] ||='56535209c321e128c3569d1eceaefed77e375b7a'

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = true
  config.action_mailer.smtp_settings = {
      address: 'ssl0.ovh.net',
      port: 587,
      domain: 'kapp10.com',
      user_name: 'contact@kapp10.com',
      password: 'footix3@0',
      authentication: 'plain',
      enable_starttls_auto: true
  }
end
