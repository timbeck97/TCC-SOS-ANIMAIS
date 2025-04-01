package org.sos.animais.gestao.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("public/arquivos")
public class FileController {

    @Value("${fileUploadPath}")
    private String localPath;

    @GetMapping("/{folder}/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename,@PathVariable String folder) {
        localPath=localPath.endsWith("/")?localPath:localPath+"/";
        Path rootLocation = Paths.get(localPath+folder);
        if (folder.contains("..") || folder.contains("/") || folder.contains("\\")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try {
            Path file = rootLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
                return ResponseEntity.ok()
                        .headers(headers)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
