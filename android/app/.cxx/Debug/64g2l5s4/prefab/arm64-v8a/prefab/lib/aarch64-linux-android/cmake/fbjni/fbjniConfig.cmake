if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/muhammadtalha/.gradle/caches/8.10.2/transforms/6dc174b9394f7f2da85e384b4bbf0f4a/transformed/jetified-fbjni-0.6.0/prefab/modules/fbjni/libs/android.arm64-v8a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/muhammadtalha/.gradle/caches/8.10.2/transforms/6dc174b9394f7f2da85e384b4bbf0f4a/transformed/jetified-fbjni-0.6.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

