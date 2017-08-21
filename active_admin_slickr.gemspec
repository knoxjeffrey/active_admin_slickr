# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'active_admin_slickr/version'

Gem::Specification.new do |spec|
  spec.name          = "active_admin_slickr"
  spec.version       = ActiveAdminSlickr::VERSION
  spec.authors       = ["Jeff Knox"]
  spec.email         = ["knoxjeffrey@outlook.com"]

  spec.summary       = %q{Bootstrap 4 skin with UI Kit for ActiveAdmin.}
  spec.description   = %q{Bootstrap 4 skin with UI Kit for ActiveAdmin.}
  spec.homepage      = "TODO: Put your gem's website or public repo URL here."
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.14"
  spec.add_development_dependency "rake", "~> 10.0"

  spec.add_dependency "tether-rails", "~> 1.4.0"
end
