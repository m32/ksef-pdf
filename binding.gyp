{
  "targets": [
    {
      "target_name": "ksef-pdf-generator",
      "type": "shared_library",
      "sources": [
        "src/addon/ksef-pdf-generator-standalone.cpp"
      ],
      "include_dirs": [],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "ExceptionHandling": 1,
              "AdditionalOptions": ["/EHsc"],
              "RuntimeLibrary": 2
            }
          },
          "configurations": {
            "Release": {
              "msvs_settings": {
                "VCCLCompilerTool": {
                  "RuntimeLibrary": 2
                }
              }
            }
          },
          "defines": [
            "_WINDLL",
            "_USRDLL"
          ]
        }]
      ],
      "link_settings": {
        "libraries": []
      }
    }
  ]
}

